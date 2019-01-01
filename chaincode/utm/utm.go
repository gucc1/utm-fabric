package main

import (
	"fmt"
  "bytes"
  "encoding/json"

  // "github.com/k0kubun/pp"
	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
)

type SmartContract struct {
}

type Plan struct {
  Time string `json:"time"`
  Area string `json:"area"`
}

type Value struct {
  Time string `json:"time"`
  Area string `json:"area"`
  User string `json:"user"`
}

func (s *SmartContract) Init(stub shim.ChaincodeStubInterface) peer.Response {
	return shim.Success(nil)
}

func (s *SmartContract) Invoke(stub shim.ChaincodeStubInterface) peer.Response {
	// Extract the function and args from the transaction proposal
	fn, args := stub.GetFunctionAndParameters()

  var err error
  var res string
	if fn == "registerPlan" {
    res, err = registerPlan(stub, args)
	} else if fn == "queryPlans" {
    res, err = queryPlans(stub, args)
  }
  // fmt.Println("ERROR! %s",err);
	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success([]byte(res))
}

func registerPlan(stub shim.ChaincodeStubInterface, args []string) (string, error) {
	if len(args) != 2 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}
  // var value string
  // var err []byte

  var plans []Plan
  if err := json.Unmarshal([]byte(args[1]), &plans); err != nil {
    return "", fmt.Errorf("Error!")
  }
  for i:=0; i<len(plans); i++ {
    key := plans[i].Time + plans[i].Area
    value, err := stub.GetState(key)
    // return "", fmt.Errorf("Error!Value:%s",value);
    if err != nil {
      return "", fmt.Errorf("Failed to register plan: time:%s, area:%s", plans[i].Time, plans[i].Area)
    }
    if value == nil {
      var v = Value{Time: plans[i].Time, Area: plans[i].Area, User: args[0]};
      asByte, _ := json.Marshal(v);
      err := stub.PutState(key, asByte) // []byteは必要?
      if err != nil {
        return "", fmt.Errorf("Failed to register plan: time:%s, area:%s", plans[i].Time, plans[i].Area)
      }
    } else {
      return "", fmt.Errorf("Failed to register plan: time:%s, area:%s", plans[i].Time, plans[i].Area)
    }
  }
  return args[1], nil
}
func queryPlans(stub shim.ChaincodeStubInterface, args []string) (string, error) {

  //   0
  // "queryString"
   if len(args) < 1 {
      return "", fmt.Errorf("Incorrect number of arguments. Expecting 1")
   }

   queryString := args[0]

   queryResults, err := getQueryResultForQueryString(stub, queryString)
   if err != nil {
         return "", fmt.Errorf("%s", err)
   }
   resultString, _ := json.Marshal(queryResults)
   fmt.Printf(string(resultString))
   return string(resultString), nil
}

// =========================================================================================
// getQueryResultForQueryString executes the passed in query string.
// Result set is built and returned as a byte array containing the JSON results.
// =========================================================================================
func getQueryResultForQueryString(stub shim.ChaincodeStubInterface, queryString string) ([]byte, error) {

	fmt.Printf("- getQueryResultForQueryString queryString:\n%s\n", queryString)

	resultsIterator, err := stub.GetQueryResult(queryString)
	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	buffer, err := constructQueryResponseFromIterator(resultsIterator)
	if err != nil {
		return nil, err
	}

	fmt.Printf("- getQueryResultForQueryString queryResult:\n%s\n", buffer.String())

	return buffer.Bytes(), nil
}
func constructQueryResponseFromIterator(resultsIterator shim.StateQueryIteratorInterface) (*bytes.Buffer, error) {
	// buffer is a JSON array containing QueryResults
	var buffer bytes.Buffer
	buffer.WriteString("[")

	bArrayMemberAlreadyWritten := false
	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()
		if err != nil {
			return nil, err
		}
		// Add a comma before array members, suppress it for the first array member
		if bArrayMemberAlreadyWritten == true {
			buffer.WriteString(",")
		}
		buffer.WriteString("{\"Key\":")
		buffer.WriteString("\"")
		buffer.WriteString(queryResponse.Key)
		buffer.WriteString("\"")

		buffer.WriteString(", \"Record\":")
		// Record is a JSON object, so we write as-is
		buffer.WriteString(string(queryResponse.Value))
		buffer.WriteString("}")
		bArrayMemberAlreadyWritten = true
	}
	buffer.WriteString("]")

  return &buffer, nil

}

// // Get returns the value of the specified asset key
// func get(stub shim.ChaincodeStubInterface, args []string) (string, error) {
// 	if len(args) != 1 {
// 		return "", fmt.Errorf("Incorrect arguments. Expecting a key")
// 	}

// 	value, err := stub.GetState(args[0])
// 	if err != nil {
// 		return "", fmt.Errorf("Failed to get asset: %s with error: %s", args[0], err)
// 	}
// 	if value == nil {
// 		return "", fmt.Errorf("Asset not found: %s", args[0])
// 	}
// 	return string(value), nil
// }

// main function starts up the chaincode in the container during instantiate
func main() {
	if err := shim.Start(new(SmartContract)); err != nil {
		fmt.Printf("Error starting SimpleAsset chaincode: %s", err)
	}
}
