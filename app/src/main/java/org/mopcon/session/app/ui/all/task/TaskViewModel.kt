package org.mopcon.session.app.ui.all.task

import android.content.Context
import android.graphics.Bitmap
import android.media.MediaScannerConnection
import android.os.Environment
import android.util.Log
import androidx.lifecycle.*
import kotlinx.coroutines.launch
import timber.log.Timber
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileOutputStream

class TaskViewModel : ViewModel() {

    private val _storedImage = MutableLiveData<Pair<Boolean, String>>()
    val storedImage: LiveData<Pair<Boolean, String>> = _storedImage

    fun storeImageToStorage(bitmap: Bitmap) {

        viewModelScope.launch {

            val filename = "succeed.png"
            var file = File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES), "mopcon")
            if (!file.exists() || !file.mkdir()) {
                Log.e(">>>", " DIRECTORY_PICTURES mkdir() fail")
                file = File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS), "mopcon")
//                file = File(Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM), "mopcon")
                if (!file.exists() && !file.mkdir()) {
                    Log.e(">>>", " DIRECTORY_DCIM  mkdir() fail")
                }
            }
//            file.createNewFile()
            val mediaFile = File(file.path + File.separator + filename)
            Log.e(">>>", "file.path + File.separator + filename = ${file.path + File.separator + filename}")
            try {
                val out = FileOutputStream(mediaFile)
                bitmap.compress(Bitmap.CompressFormat.PNG, 90, out)
                out.write(ByteArrayOutputStream().toByteArray());
                out.flush()
                out.close()
                Log.e(">>>", "success")
                _storedImage.postValue(Pair(true, mediaFile.path))
//            Toast.makeText(context, R.string.storeImageSucceed, Toast.LENGTH_SHORT).show()
            } catch (e: Exception) {
                _storedImage.postValue(Pair(false, mediaFile.path))
                Log.e(">>>", "failed")
//            Toast.makeText(context,"請幫我debug!\nprint error: $e", Toast.LENGTH_SHORT).show()
                Timber.e(">>> e = $e")
                Log.e(">>>", "e = $e")
                e.printStackTrace()
            }
        }

    }

    private fun scanner(context: Context, path: String) {
        MediaScannerConnection.scanFile(
            context, arrayOf(path), null
        ) { path, uri -> Log.e(">>>", "Finished scanning $path") }
    }
}
