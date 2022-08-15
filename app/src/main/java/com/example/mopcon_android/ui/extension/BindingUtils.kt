package com.example.mopcon_android.ui.extension

import android.widget.TextView
import timber.log.Timber
import java.text.SimpleDateFormat
import java.util.*

const val DATE_FORMAT = "MM/dd(EEEE) HH:mm"

fun TextView.textDateFormat(timeStamp: Long?, format: String ?= DATE_FORMAT) {
    var formattedTime = ""
    try {
        val dateFormat = SimpleDateFormat(format, Locale.getDefault())
        dateFormat.timeZone = TimeZone.getDefault()
        formattedTime = dateFormat.format(timeStamp)
    } catch (e: Exception) {
        Timber.e("解析日期失敗!!! \n$e")
        e.printStackTrace()
    }

    text = formattedTime

}
