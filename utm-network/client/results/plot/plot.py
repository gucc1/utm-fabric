# -*- coding: utf-8 -*-
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

data = np.loadtxt("../org1-user5-1547384423",
                  delimiter=' ', skiprows=1, usecols=(0, 2))
print(data)

# 横軸は整数値にする
plt.gca().xaxis.set_major_locator(ticker.MaxNLocator(integer=True))

plt.plot(data[0:5, 0:1], data[0:5, 1:])
plt.show()
