import matplotlib.pyplot as plt
import numpy as np
import sys
sys.path.append("/Users/andyreagan/tools/python/kitchentable")
from dogtoys import *
x = np.linspace(0, 3*np.pi, 500)
line = plt.plot(x, np.sin(x**2))
title = plt.title('A simple chirp')
mysavefig("test2.png")

