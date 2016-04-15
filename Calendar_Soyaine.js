/**
 * Created by 宋玉婷 on 2016/4/11.
 */

/**
 * @summary 当前日期
 * @desc 用于记录当前日历状态的Date对象
 * @type {Date}
 */
var currentDate = new Date();

/**
 * @summary 今日日期
 * @desc 用于记录今日信息的Date对象，创建后不改变，供“回到今天”使用
 * @type {Date}
 */
var today = new Date();
var thisMonth = today.getMonth();
var thisYear = today.getFullYear();
//newCalendar(thisYear, thisMonth);

//初始生成日历
newCalendar();

/**
 *
 * “上一年”切换按钮监听
 */
var btnLastYear = document.getElementById("lastYear");
btnLastYear.addEventListener("click", function() {
    var currentYear = currentDate.getFullYear();
    currentDate.setYear( --currentYear );
    newCalendar();
}, false);

/**
 *
 * “下一年”切换按钮监听
 */
var btnNextYear = document.getElementById("nextYear");
btnNextYear.addEventListener("click", function() {
    var currentYear = currentDate.getFullYear();
    currentDate.setYear( ++currentYear );
    newCalendar();
}, false);

/**
 *
 * “上个月”切换按钮监听
 */
var btnLastMonth = document.getElementById("lastMonth");
btnLastMonth.addEventListener("click", function() {
    var currentMonth = currentDate.getMonth();
    currentDate.setMonth( --currentMonth );
    newCalendar();
}, false);

/**
 *
 * “下个月”切换按钮监听
 */
var btnNextMonth = document.getElementById("nextMonth");
btnNextMonth.addEventListener("click", function() {
    var currentMonth = currentDate.getMonth();
    currentDate.setMonth( ++currentMonth);
    newCalendar();
}, false);

/**
 *
 * “回到今天”切换按钮监听
 */
var btnBackToday = document.getElementById("backToday");
btnBackToday.addEventListener("click", function() {
    var nowTime = today.getTime();
    currentDate.setTime(nowTime);
    newCalendar();
}, false);


/**
 * @summary 根据指定 年-月（格式：YYYY-MM）生成当月日历
 * @desc 主体部分。
 * 利用Date的构造函数调用参数，
 * 当数值大于合理范围时，会被调整为相邻值，以此获取此月日历中第一行第一列的日期。
 * 若指定月份的1号是周日，表明日历不含上月的日期，无需特殊处理；
 * 若指定月份的1号不是周日，则取相反数（原理： 1 - 周几 + 1），获取所需日期。
 * 注：此处为方便生成表格使用(++date)，日期计数取为从0开始，即1号由0表示，与Date.prototype.getDate()所得相差1。
 * 灵感来源：{@link http://jszen.blogspot.com/2007_07_01_archive.html}
 * @param {number} year - 预生成日历的年份
 * @param {number} month - 预生成日历的月份
 * @returns {date} currentDate - 当前日期（仅年份、月份发生改变）
 *
 */
function newCalendar() {
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var thisMonthDay = new Date(year, month, 1);
    var thisMonthFirstDay = thisMonthDay.getDay();
    var thisMonthFirstDate = new Date(year, month, - thisMonthFirstDay);
    //生成日历主体的日期区域
    generateTable(thisMonthFirstDate);
    //生成导航区域
    generateNav(year, month);
    //生成今日信息区域
    generateToday(year, month, date);
    currentDate.setYear(year);
    currentDate.setMonth(month);
    return currentDate;
}

/**
 * @summary 设定导航区域
 * @desc 利用年、月设定相关值
 * @param {number} year - 预生成日历的年份
 * @param {number} month - 预生成日历的月份
 * @todo 加入实时变化的时间
 *
 */
function generateNav(year, month) {
    var navYear = document.getElementById("year");
    var navMonth = document.getElementById("month");
    navYear.innerText = year.toString();
    navMonth.innerText = (month + 1).toString();
}

/**
 * @summary 根据日历首位日期，生成日历主体表格
 * @desc 首位日期指：日历的表格中第一行第一列位置的日期。
 * 利用Date的相关特性处理跨月份的情况，循环后
 * 生成 6*7 表格，加入DOM树，形成日历的主体日期区域。
 * @param {date} firstDate - 日历表格中第一行、第一列的日期数（从0开始）
 */
function generateTable(firstDate) {
    //获取日历日期部分Node
    var dateTable = document.getElementById("dateTable");
    //若不是第一次生成，则需要把此前生成的日历去掉
    while (dateTable.firstChild) {
        dateTable.removeChild(dateTable.firstChild);
    }
    var date = firstDate.getDate();
    for (var i = 0; i < 6; i++){
        var newRow = document.createElement("tr");
        for(var j = 0; j < 7; j++){
            var newDate = document.createElement("td");
            //获取日期信息
            firstDate.setDate(++date);
            date = firstDate.getDate();
            newDate.innerText = date;
            //设置Node的id，便于后期操作
            var dateInfo = firstDate.toLocaleDateString();
            newDate.setAttribute("id",dateInfo);
            newRow.appendChild(newDate);
        }
        dateTable.appendChild(newRow);
    }
}

/**
 *
 * @summary 根据具体日期，生成今日详细信息
 * @desc 在点击指定某个日期时，今日信息区域相关信息随之改变
 * @param {number} year - 指定日期所在年份
 * @param {number} month - 指定日期所在月份
 * @param {number} date - 指定日期
 * @todo 获取星座、宜&忌、农历天干地支等信息
 */
function generateToday(year, month, date) {
    var day = new Date(year, month, date);
    var thisMonth = day.getMonth();
    var thisYear = day.getFullYear();
    var dateInfo = day.toLocaleDateString();
}


//实验：表格内DOM定位
//var someDay = dateTable.childNodes[3].childNodes[1];
//alert(typeof someDay);
//var holiday = document.createTextNode("holiday");
//someDay.appendChild(holiday);



var holiday = document.createElement("div");
holiday.innerText = "端午";
var holiday_table = document.getElementById("19");
holiday_table.appendChild(holiday);

var ladDate = new Date(2016,4,-2);
dateInfo = ladDate.getDate();

