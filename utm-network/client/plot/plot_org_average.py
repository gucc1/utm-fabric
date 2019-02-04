# -*- coding: utf-8 -*-
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

for numOfUsers in [1, 5, 10, 50, 100]:
    user = "user" + str(numOfUsers)
    org1 = np.loadtxt("../org1-" + user,
                      delimiter=' ', skiprows=1, usecols=(2))
    org2 = np.loadtxt("../org2-" + user,
                      delimiter=' ', skiprows=1, usecols=(2))
    org3 = np.loadtxt("../org3-" + user,
                      delimiter=' ', skiprows=1, usecols=(2))
    org4 = np.loadtxt("../org4-" + user,
                      delimiter=' ', skiprows=1, usecols=(2))
    org5 = np.loadtxt("../org5-" + user,
                      delimiter=' ', skiprows=1, usecols=(2))
    org6 = np.loadtxt("../org6-" + user,
                      delimiter=' ', skiprows=1, usecols=(2))
    org7 = np.loadtxt("../org7-" + user,
                      delimiter=' ', skiprows=1, usecols=(2))
    org8 = np.loadtxt("../org8-" + user,
                      delimiter=' ', skiprows=1, usecols=(2))

    org1_ave = np.mean(org1)
    org2_ave = np.mean(org2)
    org3_ave = np.mean(org3)
    org4_ave = np.mean(org4)
    org5_ave = np.mean(org5)
    org6_ave = np.mean(org6)
    org7_ave = np.mean(org7)
    org8_ave = np.mean(org8)

    plt.plot(range(1, 9), [org1_ave, org2_ave, org3_ave,
                           org4_ave, org5_ave, org6_ave, org7_ave, org8_ave])

    # 横軸は整数値にする
    plt.gca().xaxis.set_major_locator(ticker.MaxNLocator(integer=True))

    plt.title('Average Processing time : ' + str(numOfUsers) + ' user')
    # plt.xlim(1, 100)
    plt.xlabel('Number of nodes')
    plt.ylabel('processing time(ms)')

    # 保存
    plt.savefig('processingTime-User' + str(numOfUsers) + '.png')
    plt.clf()
    # plt.show()
