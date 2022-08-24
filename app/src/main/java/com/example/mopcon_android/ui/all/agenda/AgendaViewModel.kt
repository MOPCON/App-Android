package com.example.mopcon_android.ui.all.agenda

import android.util.Log
import androidx.lifecycle.*
import com.example.mopcon_android.network.model.agenda.AgendaData
import com.example.mopcon_android.repository.AgendaRepository
import com.example.mopcon_android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import timber.log.Timber

class AgendaViewModel(private val repository: AgendaRepository) : ViewModel() {

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
                    _agendaList.value = it.body()?.data
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
                    _agendaList.value = it.body()?.data
                },
                onError = {
                    Timber.e("onError, $it")
                    _isLoading.postValue(false)
                }
            )
        }
    }

}
