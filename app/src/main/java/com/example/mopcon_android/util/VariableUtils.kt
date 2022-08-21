package com.example.mopcon_android.util

import android.content.res.Resources
import android.util.Log
import timber.log.Timber
import java.text.SimpleDateFormat
import java.util.*

const val MDHM_FORMAT = "MM/dd(E) HH:mm"
const val HM_FORMAT = "hh:mm"


fun Int.dpToPx(): Int = (this * Resources.getSystem().displayMetrics.density).toInt()

fun Long.toTimeFormat(format: String ?= MDHM_FORMAT) : String {
    var formattedTime = ""
    val unixTime = this*1000L
    try {
        val dateFormat = SimpleDateFormat(format, Locale.getDefault())
        dateFormat.timeZone = TimeZone.getDefault()
        formattedTime = dateFormat.format(unixTime)
    } catch (e: Exception) {
        Timber.e("Parse datetime failed : $e")
        e.printStackTrace()
    }
    return formattedTime
}