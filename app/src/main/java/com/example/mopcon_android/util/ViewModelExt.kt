package com.example.mopcon_android.util

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.CoroutineDispatcher
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

fun <T> ViewModel.request(
    request: suspend () -> T,
    onSuccess: (value: T) -> Unit,
    onError: ((exception: Exception) -> Unit)?,
    onSuccessDispatcher: CoroutineDispatcher = Dispatchers.Main,
    onErrorDispatcher: CoroutineDispatcher = Dispatchers.Main,
) {
    viewModelScope.launch(Dispatchers.IO) {
        try {
            val data = request.invoke()
            viewModelScope.launch(onSuccessDispatcher) { onSuccess.invoke(data) }
        } catch (e: Exception) {
            viewModelScope.launch(onErrorDispatcher) { onError?.invoke(e) }
        }
    }
}