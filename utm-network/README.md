# UTM network

[hyperledger/fabric-samples](https://github.com/hyperledger/fabric-samples)の`first-network`を拡張させたもの
Chaincode は、`chaincode/utm/`以下にある

## Requirements

- Node.js(v10.13.0)
- Docker(18.09.2)
- Docker compose(1.23.2)

## Usage

### Network

1. 初期化

```bash
./byfn.sh generate -i 1.3.0 -o 2
```

ネットワークや鍵情報の初期化  
`-o` は拡張したオプションで org 数を指定できる(ただし`template/`以下に該当する`docker-compose`ファイルがないといけない)

2. 起動

```bash
./byfn.sh up -i 1.3.0 -o 2
```

バックグラウンドで各ノードが起動する

3. 停止

```bash
./byfn.sh down -i 1.3.0 -o 2
```

### Client

`client/`以下に[hyperledger/fabric-sdk-node](https://github.com/hyperledger/fabric-sdk-node)を利用したスクリプトがいくつか配置してある。研究におけるベンチマークを当初こちらで行っていたが、[caliper](https://github.com/gucc1/utm-caliper)へ移行したため、基本的なクライアントからのアクセスの仕方のみを説明する

1. クライアント用の鍵を生成する

```bash
cd client/
rm -rf hfc-key-store/ #残っていた場合は削除する
node enrollAdmin.js && node registerUser.js
```

2. invoke

```bash
node invoke-solo.js 2
```

1 件の飛行リクエストを投げるだけのスクリプト。  
本家の`fabcar`を参考に作成している。

## Other

- experiment.sh
  一連の実験をするためのスクリプト。ノードの起動、停止、experiment.js を利用したリクエストまでを行う

- generateUsers.js
  引数に合わせて重複のないユーザーデータを作成する

- generateUsersForSimulation.js
  決められたエリア内で指定のユーザー数分重複のないルートを作成する

- results/
  expeiment.js のベンチマーク結果が出力される
- data/
  実験ユーザーデータを格納する
