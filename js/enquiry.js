'use strict';

(function () {
  var waNumber = '918551001442';
  var defaultMsg =
    'Hello ORK Fitness, I am interested in joining your gym. I would like to know more about the membership and available options.';

  function buildWaUrl(message) {
    return 'https://wa.me/' + waNumber + '?text=' + encodeURIComponent(message);
  }

  function openWhatsApp(message) {
    window.open(buildWaUrl(message), '_blank', 'noopener,noreferrer');
  }

  function normalizeIndianMobile(raw) {
    var digits = String(raw || '').replace(/\D/g, '');
    if (digits.length === 12 && digits.indexOf('91') === 0) {
      digits = digits.slice(2);
    } else if (digits.length === 11 && digits.charAt(0) === '0') {
      digits = digits.slice(1);
    }
    return digits;
  }

  function isValidIndianMobile(raw) {
    return /^[6-9]\d{9}$/.test(normalizeIndianMobile(raw));
  }

  document.querySelectorAll('[data-whatsapp]').forEach(function (el) {
    var custom = el.getAttribute('data-whatsapp-message');
    el.setAttribute('href', buildWaUrl(custom || defaultMsg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  var form = document.getElementById('enquiry-form');
  if (!form) {
    return;
  }

  var errorBox = document.getElementById('enquiry-error');

  function showError(msg) {
    if (!errorBox) {
      return;
    }
    errorBox.textContent = msg;
    errorBox.hidden = false;
  }

  function clearError() {
    if (!errorBox) {
      return;
    }
    errorBox.textContent = '';
    errorBox.hidden = true;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearError();

    var name = (form.elements.fullName.value || '').trim();
    var mobileRaw = (form.elements.mobile.value || '').trim();
    var interestedIn = form.elements.interestedIn.value;
    var preferredTime = form.elements.preferredTime.value;
    var fitnessGoal = form.elements.fitnessGoal.value;
    var message = (form.elements.message.value || '').trim();

    if (!name) {
      showError('Please enter your full name.');
      form.elements.fullName.focus();
      return;
    }
    if (!isValidIndianMobile(mobileRaw)) {
      showError('Please enter a valid 10-digit Indian mobile number.');
      form.elements.mobile.focus();
      return;
    }
    if (!interestedIn) {
      showError('Please select what you are interested in.');
      form.elements.interestedIn.focus();
      return;
    }
    if (!preferredTime) {
      showError('Please select your preferred time.');
      form.elements.preferredTime.focus();
      return;
    }
    if (!fitnessGoal) {
      showError('Please select your fitness goal.');
      form.elements.fitnessGoal.focus();
      return;
    }

    var mobile = normalizeIndianMobile(mobileRaw);
    var lines = [
      'Hello ORK Fitness,',
      '',
      'I would like to enquire about your gym.',
      '',
      'Name: ' + name,
      'Mobile: ' + mobile,
      'Interested In: ' + interestedIn,
      'Preferred Time: ' + preferredTime,
      'Fitness Goal: ' + fitnessGoal
    ];
    if (message) {
      lines.push('Message: ' + message);
    }
    lines.push('', 'Thank you.');

    openWhatsApp(lines.join('\n'));
  });
})();
