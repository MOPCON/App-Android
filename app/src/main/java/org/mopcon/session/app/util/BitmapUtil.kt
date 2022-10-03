package org.mopcon.session.app.util

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.util.Base64
import android.util.Log

object BitmapUtil {

    //base64 轉化二進制字符成 Bitmap
    fun stringToBitmap(data: String?): Bitmap? {
        var bitmap: Bitmap? = null
        try {
            val bitmapArray: ByteArray = Base64.decode(data, Base64.DEFAULT)
            bitmap = BitmapFactory.decodeByteArray(bitmapArray, 0, bitmapArray.size)
        } catch (e: Exception) {
            Log.e(">>>", "e = $e")
            e.printStackTrace()
        }

        return bitmap
    }

}
