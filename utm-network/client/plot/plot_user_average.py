# -*- coding: utf-8 -*-
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

for numOfNode in [1, 2, 4, 8, 16, 30]:
    node = "node" + str(numOfNode)
    path = "./plot_data/" + node
    requests = [1, 5, 10, 50, 100, 500, 1000]
    averages = []
    for numOfRequest in requests:

        rawData = np.loadtxt(path + "/user" + str(numOfRequest),
                        delimiter=' ', skiprows=1, usecols=(1, 2), dtype=str)
        # user5 = np.loadtxt(path + "/user5",
        #                 delimiter=' ', skiprows=1, usecols=(2))
        # user10 = np.loadtxt(path + "/user10",
        #                 delimiter=' ', skiprows=1, usecols=(2))
        # user50 = np.loadtxt(path + "/user50",
        #                 delimiter=' ', skiprows=1, usecols=(2))
        # user100 = np.loadtxt(path + "/user100",
        #                 delimiter=' ', skiprows=1, usecols=(2))
        # user500 = np.loadtxt(path + "/user500",
        #                 delimiter=' ', skiprows=1, usecols=(2))
        # user1000 = np.loadtxt(path + "/user1000",
        #                 delimiter=' ', skiprows=1, usecols=(2))

        successData = []
        for data in rawData:
            if data[0] == 'success':
                successData.append(float(data[1]))


        averages.append(np.mean(successData))

        # user1_ave = np.mean(user1)
        # user5_ave = np.mean(user5)
        # user10_ave = np.mean(user10)
        # user50_ave = np.mean(user50)
        # user100_ave = np.mean(user100)
        # user500_ave = np.mean(user500)

    # plt.plot(user1[:, 0], user1[:, 1])
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
