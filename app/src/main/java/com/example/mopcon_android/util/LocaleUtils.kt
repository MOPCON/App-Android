package com.example.mopcon_android.util

import java.util.*

//object LocaleUtils {
//    fun getLanguage (en: String, isEnglish: (String) -> (Unit), isOtherLanguage: () -> String) {
//        if (Locale.getDefault().language == "en") isEnglish.invoke(en) else isOtherLanguage.invoke()
//    }
//}


fun getDeviceLanguage (isEnglish: () -> String, isOtherLanguage: () -> String): String {
    return if (Locale.getDefault().language == "en") isEnglish.invoke()
    else isOtherLanguage.invoke()
}