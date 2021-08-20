import matplotlib.pyplot as plt
import numpy as np
import zfit

ZFIT_DISABLE_TF_WARNINGS = 1

# load the data
data_np = np.genfromtxt("fit_example/gauss_data.csv", delimiter=", ")
n_bins = 100

obs = zfit.Space("x", limits=(np.min(data_np), np.max(data_np)))
data = zfit.Data.from_numpy(obs=obs, array=data_np)


# create the model
mu = zfit.Parameter("mu", 2.4, -1, 5)
sigma = zfit.Parameter("sigma", 1.3, 0, 5)
gauss = zfit.pdf.Gauss(obs=obs, mu=mu, sigma=sigma)

# build the loss
nll = zfit.loss.UnbinnedNLL(model=gauss, data=data)

# minimize
minimizer = zfit.minimize.Minuit()
result = minimizer.minimize(nll)

# calculate errors
param_errors = result.hesse()

# plot histogram first
plt.figure()
hist, bins, _ = plt.hist(data_np, bins=n_bins, alpha=0.8, label="Data")
bin_mids = (bins[1:] + bins[:-1]) / 2

# plot fitted model afterwards
x = np.linspace(np.min(data_np), np.max(data_np), 1000)
n_bins = 100
per_bin = n_bins / len(data_np)
scale = len(data_np) / n_bins * obs.area()

y = gauss.pdf(x).numpy() * scale
plt.plot(x, y, label="Gauss Model")
plt.legend()
plt.xlabel("Energy / MeV")
plt.ylabel(f"Entries / {per_bin:.2f} MeV")
plt.savefig("fit_example/fit_result.pdf")

# param output
print(result.params)
