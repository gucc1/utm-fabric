# -*- coding: utf-8 -*-
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

for numOfNode in [1, 2, 4, 8, 16, 30]:
    node = "node" + str(numOfNode)
    path = "./plot_data/" + node
    requests = [1, 5, 10, 50, 100, 500]
    averages = []
    for numOfRequest in requests:

        rawData = np.loadtxt(path + "/user" + str(numOfRequest),
                        delimiter=' ', skiprows=1, usecols=(1, 2), dtype=str)

        successData = []
        for data in rawData:
            if data[0] == 'success':
                successData.append(float(data[1]))


        averages.append(np.mean(successData))

    plt.plot(requests, averages, label=str(numOfNode) + ' node')

# 横軸は整数値にする
plt.gca().xaxis.set_major_locator(ticker.MaxNLocator(integer=True))

plt.title('Average Processing time')
plt.xlim(1, 1000)
plt.xlabel('Number of user')
plt.ylabel('Latency(ms)')
plt.legend()

# 保存
plt.savefig('test.png')
plt.show()
