# -*- coding: utf-8 -*-
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

user1 = np.loadtxt("../org1-user1",
                   delimiter=' ', skiprows=1, usecols=(0, 2))
user5 = np.loadtxt("../org1-user5",
                   delimiter=' ', skiprows=1, usecols=(0, 2))
user10 = np.loadtxt("../org1-user10",
                    delimiter=' ', skiprows=1, usecols=(0, 2))
user50 = np.loadtxt("../org1-user50",
                    delimiter=' ', skiprows=1, usecols=(0, 2))
user100 = np.loadtxt("../org1-user100",
                     delimiter=' ', skiprows=1, usecols=(0, 2))


# plt.plot(user1[:, 0], user1[:, 1])
plt.plot(user5[:, 0], user5[:, 1], label='5 users')
plt.plot(user10[:, 0], user10[:, 1], label='10 users')
plt.plot(user50[:, 0], user50[:, 1], label='50 users')
plt.plot(user100[:, 0], user100[:, 1], label='100 users')
plt.legend()

# 横軸は整数値にする
plt.gca().xaxis.set_major_locator(ticker.MaxNLocator(integer=True))

plt.title('Processing time : 1 node')
plt.xlim(1, 100)
plt.xlabel('Number of users')
plt.ylabel('Processing time(ms)')

# 保存
# plt.savefig('processingTime-Org1.png')
plt.show()
