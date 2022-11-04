package org.mopcon.session.app.ui.all

import androidx.lifecycle.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import org.mopcon.session.app.network.model.initial.InitialData
import org.mopcon.session.app.network.service.ApiService
import org.mopcon.session.app.util.request
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
