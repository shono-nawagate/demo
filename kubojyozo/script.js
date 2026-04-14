/* ================================================================
   久保醸造 ヤマキュー — カスタムスクリプト
   jQuery + slick.js ベース（aiship 標準）
   ================================================================ */

$(function () {

  /* ---- メインビジュアル スライダー (slick.js) --------------- */
  $('.hero-slider').slick({
    dots:          true,
    arrows:        true,
    autoplay:      true,
    autoplaySpeed: 5000,
    fade:          true,
    cssEase:       'ease-in-out',
    pauseOnHover:  true,
    prevArrow:     '<button class="slick-prev" aria-label="前のスライド">&#8249;</button>',
    nextArrow:     '<button class="slick-next" aria-label="次のスライド">&#8250;</button>'
  });

  /* ---- スクロール時のヘッダーシャドウ ----------------------- */
  var $header = $('#siteHeader');
  $(window).on('scroll', function () {
    $header.toggleClass('is-scrolled', $(this).scrollTop() > 4);
  });

  /* ---- 検索パネル開閉 --------------------------------------- */
  var $searchPanel = $('#searchPanel');

  $('#searchOpen').on('click', function () {
    var isOpen = $searchPanel.hasClass('is-open');
    $searchPanel.toggleClass('is-open', !isOpen);
    $(this).attr('aria-expanded', String(!isOpen));
    if (!isOpen) {
      $searchPanel.find('.search-field').focus();
    }
  });

  $('#searchClose').on('click', function () {
    $searchPanel.removeClass('is-open');
    $('#searchOpen').attr('aria-expanded', 'false');
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $searchPanel.hasClass('is-open')) {
      $searchPanel.removeClass('is-open');
      $('#searchOpen').attr('aria-expanded', 'false');
    }
  });

  /* ---- モバイルドロワー ------------------------------------- */
  var $overlay   = $('#mobOverlay');
  var $drawer    = $('#mobDrawer');
  var $hamburger = $('#hamburger');

  function openDrawer() {
    $hamburger.addClass('open').attr('aria-expanded', 'true');
    $drawer.addClass('is-open').attr('aria-hidden', 'false');
    $overlay.addClass('is-open');
    $('body').css('overflow', 'hidden');
  }

  function closeDrawer() {
    $hamburger.removeClass('open').attr('aria-expanded', 'false');
    $drawer.removeClass('is-open').attr('aria-hidden', 'true');
    $overlay.removeClass('is-open');
    $('body').css('overflow', '');
  }

  $hamburger.on('click', function () {
    $drawer.hasClass('is-open') ? closeDrawer() : openDrawer();
  });

  $('#mobClose').on('click', closeDrawer);
  $overlay.on('click', closeDrawer);

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape' && $drawer.hasClass('is-open')) closeDrawer();
  });

  /* ---- モバイルアコーディオン ------------------------------ */
  $('.mob-expand').on('click', function () {
    var $btn  = $(this);
    var $sub  = $btn.next('.mob-sub');
    var isOpen = $btn.attr('aria-expanded') === 'true';

    // 他のアコーディオンを閉じる
    $('.mob-expand').not($btn).attr('aria-expanded', 'false');
    $('.mob-sub').not($sub).removeClass('is-open');

    $btn.attr('aria-expanded', String(!isOpen));
    $sub.toggleClass('is-open', !isOpen);
  });

});
