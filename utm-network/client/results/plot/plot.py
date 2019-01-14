# -*- coding: utf-8 -*-
import numpy as np
import matplotlib.pyplot as plt

data = np.loadtxt("../org1-user5-1547384423",
                  delimiter=' ', skiprows=1, usecols=(0, 2))
print(data)
