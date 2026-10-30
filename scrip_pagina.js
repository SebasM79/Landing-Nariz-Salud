// Simulador de Pantalla OLED + Lógica Walkman
function setOled(mode, btnElement) {
  const status = document.getElementById("oledStatus");
  const metrics = document.getElementById("oledMetrics");
  const display = document.getElementById("oledDisplay");
  const led = document.getElementById("walkmanLed");
  const scenarios = {
    clean: {
      statusText: "🍃 AIRE LIMPIO",
      statusClass: "clean",
      metricsHtml:
        "VOCs: 12 ppb | Calidad: Excelente<br>Temp: 23.5°C | Humedad: 48%<br>Peligro Fugas: NINGUNO",
    },
    gas: {
      statusText: "🚨 ALERTA: FUGA DE GAS",
      statusClass: "gas",
      metricsHtml:
        '<span class="oled-metric-alert oled-metric-alert-gas">MQ-2: 850 ppm (GLP/Propano)</span><br>Buzzer: ACTIVADO (85dB)<br>Notificación enviada por WhatsApp',
    },
    co: {
      statusText: "⚠️ ALERTA: MONÓXIDO (CO)",
      statusClass: "co",
      metricsHtml:
        '<span class="oled-metric-alert oled-metric-alert-co">MQ-9: 120 ppm (Peligro Alto)</span><br>Combustión Incompleta Detectada<br>Ventilar ambiente inmediatamente',
    },
    spoil: {
      statusText: "🍏 ALIMENTO DESCOMPUESTO",
      statusClass: "spoil",
      metricsHtml:
        "MQ-135 (NH3/Sulfuros): Elevado<br>BME688 TinyML: Orgánico alterado<br>Estado: No Apto para Consumo",
    },
  };

  const scenario = scenarios[mode];
  if (!scenario) return;

  document
    .querySelectorAll(".sim-btn")
    .forEach((button) => button.classList.remove("active"));
  btnElement.classList.add("active");

  status.className = `oled-status oled-status-${scenario.statusClass}`;
  status.innerText = scenario.statusText;
  metrics.innerHTML = scenario.metricsHtml;
  display.className = `oled-screen oled-screen-${scenario.statusClass}`;
  led.className = `led-indicator led-indicator-${scenario.statusClass}`;
}

// Selector de Pestañas de Prototipos
function switchTab(tabId, btnElement) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((button) => button.classList.remove("active"));
  document
    .querySelectorAll(".tab-content")
    .forEach((content) => content.classList.remove("active"));

  btnElement.classList.add("active");
  document.getElementById(tabId).classList.add("active");
}

document.querySelectorAll(".sim-btn").forEach((button) => {
  button.addEventListener("click", () => {
    setOled(button.dataset.scenario, button);
  });
});

document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    switchTab(button.dataset.tab, button);
  });
});
