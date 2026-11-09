/* =============================================
   js/form.js — Master Form Coordinator & Glue
   Universal Portfolio Studio — v3.8 Workbench Architecture
   ============================================= */

// Re-export methods on FormState for backwards compatibility
if (typeof FormState !== 'undefined') {
  FormState.renderStep = function (step) {
    this.currentStep = parseInt(step, 10);
    if (typeof renderCurrentStep === 'function') {
      renderCurrentStep();
    }
  };

  FormState.init = function () {
    this.loadFromStorage();
    if (typeof renderCurrentStep === 'function') {
      renderCurrentStep();
    }
    if (typeof updateStepIndicator === 'function') {
      updateStepIndicator();
    }
  };
}

// Global hook for stepper dot, rail tabs, and mobile pill clicks
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.wb-rail-tab, .mobile-step-pill, .step-tab, .step-dot').forEach(tab => {
    tab.addEventListener('click', function () {
      const step = this.dataset.step;
      if (step && typeof goToStep === 'function') {
        goToStep(step);
      }
    });
  });

  if (typeof FormState !== 'undefined' && typeof FormState.init === 'function') {
    FormState.init();
  }
});
