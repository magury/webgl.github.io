//获取某年某月第一天是星期几
const dayStart = (month, year) => {
  let tmpDate = new Date(year, month, 1);
  return tmpDate.getDay();
};
//计算某年是不是闰年，通过求年份除以4的余数即可
const daysMonth = (month, year) => {
  let month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return month_olympic[month];
  } else {
    return month_normal[month];
  }
};
//刷新日历
const refreshDate = (month, year) => {
  //重置颜色
  $(".data td").each((index, item) => $(item).css("color", "rgb(255,255,255)"));
  //日期
  let firstday = dayStart(month, year);
  let daycount = daysMonth(month);
  $('  td[colspan="7"] span').eq(0).text(year).attr("data_year", year); //thead
  $('  td[colspan="7"] span')
    .eq(1)
    .text(month + 1)
    .attr("data_month", month + 1); //thead
  //填充日期
  for (var i = firstday; i < daycount + firstday; i++) {
    $("td[data_date=" + i + "]")
      .text(i - firstday + 1)
      .css("color", "rgb(78, 84, 84)");
  }
  //填充其他日期
  nextMonth(month, year, i);
  prevmonth(month, year);
  position_current_date();
};
const nextMonth = (month, year, daycount) => {
  var number = 1;
  $("tbody td").each((index, item) => {
    if (index >= daycount) $(item).text(number++);
  });
};
//填充上一个月的日期残余
const prevmonth = (month, year) => {
  var timer = prev_next_info(month, year, "em");
  var last_day_amount = daysMonth(timer.last_month, timer.last_year);
  var current_day_id = dayStart(month, year);
  for (var i = current_day_id - 1; i >= 0; i--) {
    $("td[data_date=" + i + "]").text(last_day_amount--);
  }
};
const prev_next_info = (month, year, status) => {
  var last_month = month;
  var last_year = year;
  if (status == "em") {
    if (month === 0) {
      last_year--;
      last_month = 11;
    } else {
      last_month--;
    }
  }
  if (status == "i") {
    if (month === 11) {
      last_year++;
      last_month = 0;
    } else {
      last_month++;
    }
  }

  return {
    last_year,
    last_month,
  };
};
const position_current_date = () => {
  var date = new Date();
  $("tbody td").css("background", "none");
  for (var i = 0; i <= 41; i++) {
    if (
      $("tbody td").eq(i).text() == date.getDate() &&
      $("thead span").eq(0).attr("data_year") == date.getFullYear() &&
      $("thead span").eq(1).attr("data_month") == date.getMonth() + 1
    ) {
      $("tbody td").eq(i).css("background", "red");
      $("tbody td").eq(i).css("color", "white");
      break;
    }
  }
};
