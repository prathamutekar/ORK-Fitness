'use strict';

(function ($) {
  var PLACE_URL = 'https://maps.app.goo.gl/ahmonhBB2PFXYJ559';

  function starsHtml(rating) {
    var full = Math.round(Number(rating) || 0);
    var html = '';
    for (var i = 1; i <= 5; i++) {
      html += '<i class="fa fa-star' + (i <= full ? '' : '-o') + '" aria-hidden="true"></i>';
    }
    return html;
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function initials(name) {
    var parts = String(name || '').trim().split(/\s+/);
    var letters = (parts[0] ? parts[0].charAt(0) : '') + (parts[1] ? parts[1].charAt(0) : '');
    return letters.toUpperCase() || 'G';
  }

  function render(data) {
    var $summary = $('#google-reviews-summary');
    var $track = $('#google-reviews-track');
    if (!$track.length) {
      return;
    }

    if (data.rating && data.reviewCount) {
      $summary.html(
        '<div class="gr-summary">' +
          '<div class="gr-summary-logo" aria-hidden="true"><i class="fa fa-google"></i></div>' +
          '<div class="gr-summary-meta">' +
            '<div class="gr-summary-score">' +
              '<span class="gr-rating-value">' + escapeHtml(data.rating) + '</span>' +
              '<span class="gr-rating-stars" aria-label="' + escapeHtml(data.rating) + ' out of 5">' +
                starsHtml(data.rating) +
              '</span>' +
            '</div>' +
            '<p class="gr-summary-count">Based on ' + escapeHtml(data.reviewCount) + ' Google reviews</p>' +
          '</div>' +
        '</div>'
      );
    }

    var reviews = Array.isArray(data.reviews) ? data.reviews : [];
    if (!reviews.length) {
      $track.html(
        '<div class="col-12 text-center">' +
          '<p class="gr-empty">Reviews could not be loaded. Please view them on Google.</p>' +
        '</div>'
      );
      return;
    }

    var cards = reviews.map(function (review) {
      return (
        '<div class="gr-slide">' +
          '<article class="gr-card">' +
            '<div class="gr-card-top">' +
              '<div class="gr-avatar" aria-hidden="true">' + escapeHtml(initials(review.author)) + '</div>' +
              '<div class="gr-author">' +
                '<h3>' + escapeHtml(review.author) + '</h3>' +
                '<span class="gr-source"><i class="fa fa-google" aria-hidden="true"></i> ' +
                  escapeHtml(review.relativeTime || 'Google review') +
                '</span>' +
              '</div>' +
              '<span class="gr-badge" aria-hidden="true"><i class="fa fa-google"></i></span>' +
            '</div>' +
            '<p class="gr-text">' + escapeHtml(review.text) + '</p>' +
          '</article>' +
        '</div>'
      );
    });

    $track.html(cards.join(''));

    if ($track.hasClass('owl-loaded')) {
      $track.trigger('destroy.owl.carousel');
      $track.removeClass('owl-loaded owl-hidden');
      $track.find('.owl-stage-outer').children().unwrap();
    }

    $track.owlCarousel({
      loop: reviews.length > 1,
      margin: 24,
      nav: true,
      dots: true,
      items: 1,
      smartSpeed: 700,
      autoplay: true,
      autoplayTimeout: 6500,
      autoplayHoverPause: true,
      navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        1100: { items: 3 }
      }
    });
  }

  function showFallback() {
    $('#google-reviews-summary').html('');
    $('#google-reviews-track').html(
      '<div class="col-12">' +
        '<div class="reviews-card">' +
          '<div class="google-icon" aria-hidden="true"><i class="fa fa-google"></i></div>' +
          '<p>Unable to load Google reviews right now. You can still read the latest reviews on the official ORK Fitness Google profile.</p>' +
          '<a href="' + PLACE_URL + '" class="primary-btn" target="_blank" rel="noopener noreferrer">View All Google Reviews</a>' +
        '</div>' +
      '</div>'
    );
  }

  $(function () {
    $.getJSON('data/google-reviews.json')
      .done(function (data) {
        render(data || {});
      })
      .fail(function () {
        showFallback();
      });
  });
})(jQuery);
