let pyodide;

async function loadDeps() {
  pyodide = await loadPyodide({
    indexURL: "https://cdn.jsdelivr.net/pyodide/v0.18.0/full/",
  });
  await Promise.all([
    pyodide.loadPackage("numpy"),
    pyodide.loadPackage("matplotlib"),
  ]);
}

async function testPlot() {
  const pythonCode = `
    import numpy as np
    import matplotlib.pyplot as plt
    import io, base64

    x = np.linspace(0,10,100)
    y = x**2
    plt.plot(x, y)

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    buf.seek(0)
    img_str = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')
  `;
  return pyodide.runPythonAsync(pythonCode).then(() => pyodide.globals.img_str);
}

$(document).ready(function () {
  $("#loading").show();
  loadDeps()
    .then(function () {
      $("#loading").hide();
    })
    .then(function () {
      testPlot().then((src) => {
        $("#plot").attr("src", src);
      });
    });
});
