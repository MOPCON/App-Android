package org.mopcon.android.ui.all

import androidx.lifecycle.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.mopcon.android.network.model.initial.InitialData
import org.mopcon.android.network.service.ApiService
import org.mopcon.android.util.request
import timber.log.Timber

class SplashViewModel(private val apiService: ApiService) : ViewModel() {

    private val _initial = MutableLiveData<InitialData>()
    val initial: LiveData<InitialData?> = _initial

    fun getInit() {
        viewModelScope.launch(Dispatchers.IO) {
            request(
                request = { apiService.getInitial() },
                onSuccess = {
                    _initial.postValue(it.body()?.initialData)
                },
                onError = {
                    Timber.e("exception = $it")
                }
            )
        }
    }

}
