# -*- coding: utf-8 -*-
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

for numOfOrg in range(1, 9):
    org = "org" + str(numOfOrg)
    user1 = np.loadtxt("../" + org + "-user1",
                       delimiter=' ', skiprows=1, usecols=(2))
    user5 = np.loadtxt("../" + org + "-user5",
                       delimiter=' ', skiprows=1, usecols=(2))
    user10 = np.loadtxt("../" + org + "-user10",
                        delimiter=' ', skiprows=1, usecols=(2))
    user50 = np.loadtxt("../" + org + "-user50",
                        delimiter=' ', skiprows=1, usecols=(2))
    user100 = np.loadtxt("../" + org + "-user100",
                         delimiter=' ', skiprows=1, usecols=(2))

    user1_ave = np.mean(user1)
    user5_ave = np.mean(user5)
    user10_ave = np.mean(user10)
    user50_ave = np.mean(user50)
    user100_ave = np.mean(user100)

    # plt.plot(user1[:, 0], user1[:, 1])
    plt.plot([1, 5, 10, 50, 100], [user1_ave, user5_ave,
                                   user10_ave, user50_ave, user100_ave], label=str(numOfOrg) + ' node')

# 横軸は整数値にする
plt.gca().xaxis.set_major_locator(ticker.MaxNLocator(integer=True))

plt.title('Average Processing time')
plt.xlim(1, 100)
plt.xlabel('Number of users')
plt.ylabel('Processing time(ms)')
plt.legend()

# 保存
plt.savefig('processingTime-node-average.png')
plt.show()
