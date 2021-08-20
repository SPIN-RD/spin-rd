import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
gauss = np.random.normal(loc=0, scale=1, size=10000)

plt.hist(gauss,  bins=100, label="Gaussian Distribution")
plt.legend()
plt.savefig("fit_example/gauss.pdf",)

gauss.tofile("fit_example/gauss_data.csv", sep=', ')

