$(document).ready(function () {
  // $(".badge.badge-danger").click(function() {
  //     $(this).toggle();
  // });
  // $(".badge.badge-success").click(function() {

  // });

  let bodyElement = $("body");

  if (bodyElement.hasClass("view-02")) {
    initDayView();
  } else if (bodyElement.hasClass("view-03")) {
    initBookingView();
  } else if (bodyElement.hasClass("view-06")) {
    initSettingsView();
  }

  initTooltips();
});

function initDayView() {
  initDayView_ToggleIndicators();
}

function initDayView_ToggleIndicators() {
  let danger = $(".badge.badge-danger");
  let success = $(".badge.badge-success");
  let infoBadges = $(".badge.badge-info");

  let toggle = function () {
    danger.toggle();
    success.toggle();
    infoBadges.toggle();
  };

  danger.click(toggle);
  success.click(toggle);
}

function initBookingView() {
  let handleTime = function (minutes, sourceElement, targetElement) {
    let sourceTime = sourceElement.val();
    let targetValue = targetElement.val();
    if (targetValue) {
      sourceTime = targetValue;
    }

    if (!sourceTime) {
      return;
    }

    let newTime = moment(sourceTime, "HH:mm")
      .add(minutes, "minutes")
      .format("HH:mm");
    targetElement.val(newTime);

    console.log(
      "add: " + minutes + " to " + sourceTime + " equals: " + newTime
    );
  };

  $(".time-from-subtractor").click(function (e) {
    e.preventDefault();

    let minutes = $(this).data("time");
    let sourceElement = $("#time-to");
    let targetElement = $("#time-from");

    handleTime(minutes, sourceElement, targetElement);
  });

  $(".time-to-adder").click(function (e) {
    e.preventDefault();

    let minutes = $(this).data("time");
    let sourceElement = $("#time-from");
    let targetElement = $("#time-to");

    handleTime(minutes, sourceElement, targetElement);
  });

  $(".time-clearer").click(function (e) {
    e.preventDefault();
    let element = $(this);
    let target = element.attr("href");
    $(target).val(null);
  });
}

function initSettingsView() {
  $("#monday-check").click(function (e) {
    let element = $(this);
    let elementChecked = element.prop("checked");
    $("#monday-from").prop("disabled", !elementChecked);
    $("#monday-to").prop("disabled", !elementChecked);
  });
  $("#tuesday-check").click(function (e) {
    let element = $(this);
    let elementChecked = element.prop("checked");
    $("#tuesday-from").prop("disabled", !elementChecked);
    $("#tuesday-to").prop("disabled", !elementChecked);
  });
}

function initTooltips() {
  $('[data-toggle="tooltip"]').tooltip();
}
