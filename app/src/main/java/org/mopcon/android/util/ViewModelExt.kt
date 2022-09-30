package org.mopcon.android.util

import android.util.Log
import android.widget.Toast
import androidx.lifecycle.LiveData
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.mopcon.android.MyApplication
import org.mopcon.android.R
import retrofit2.Response
import timber.log.Timber

fun <T> ViewModel.request(
    request: suspend () -> T,
    onSuccess: (value: T) -> Unit,
    onError: ((exception: Exception) -> Unit)?,
    onSuccessDispatcher: CoroutineDispatcher = Dispatchers.Main,
    onErrorDispatcher: CoroutineDispatcher = Dispatchers.Main,
) {
    viewModelScope.launch(Dispatchers.IO) {
        try {
            val data: T = request.invoke()
            viewModelScope.launch(onSuccessDispatcher) {
                if (data is Response<*> && data.isSuccessful) {
                    onSuccess.invoke(data)
                } else {
                    Timber.e("load api failed : $data")
                    //TODO: do we need to deal with api return html error ?
                    viewModelScope.launch(Dispatchers.Main) { Toast.makeText(MyApplication.application, R.string.error_message, Toast.LENGTH_SHORT).show() }
                    onError?.invoke(Exception())
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e(">>>", "e = $e")
            viewModelScope.launch(Dispatchers.Main) { Toast.makeText(MyApplication.application, R.string.error_message, Toast.LENGTH_SHORT).show() }
            viewModelScope.launch(onErrorDispatcher) { onError?.invoke(e) }
        }
    }
}

fun <T, K, R> LiveData<T>.combineWith(
    liveData: LiveData<K>,
    block: (T?, K?) -> R
): LiveData<R> {
    val result = MediatorLiveData<R>()
    result.addSource(this) {
        result.value = block(this.value, liveData.value)
    }
    result.addSource(liveData) {
        result.value = block(this.value, liveData.value)
    }
    return result
}
