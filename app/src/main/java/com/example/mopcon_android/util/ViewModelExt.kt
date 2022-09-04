package com.example.mopcon_android.util

import android.util.Log
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
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
                    onError?.invoke(Exception())
                }
            }
        } catch (e: Exception) {
            e.printStackTrace()
            Log.e(">>>", "e = $e")
            viewModelScope.launch(onErrorDispatcher) { onError?.invoke(e) }
        }
    }
}