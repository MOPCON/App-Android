package com.example.mopcon_android.ui.all.agenda

import androidx.lifecycle.*
import com.example.mopcon_android.network.model.agenda.AgendaData
import com.example.mopcon_android.repository.AgendaRepository
import com.example.mopcon_android.ui.base.BaseViewModel
import com.example.mopcon_android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import timber.log.Timber

class AgendaViewModel(repository: AgendaRepository) : BaseViewModel(repository) {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _agendaList = MutableLiveData<List<AgendaData>>()
    val agendaList: LiveData<List<AgendaData>> = _agendaList

    fun getAgenda() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)

            request(
                request = {
                    repository.getAgenda()
                },
                onSuccess = {
                    _isLoading.postValue(false)
                    _agendaList.value = it.body()?.data ?: listOf()
                },
                onError = {
                    Timber.e("onError, $it")
                    _isLoading.postValue(false)
                }
            )
        }
    }

    fun getExchange() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { repository.getExchange() },
                onSuccess = {
                    _isLoading.postValue(false)
                    _agendaList.value = it.body()?.data ?: listOf()
                },
                onError = {
                    Timber.e("onError, $it")
                    _isLoading.postValue(false)
                }
            )
        }
    }

}
