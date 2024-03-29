package org.mopcon.session.app.ui.all.agenda

import androidx.lifecycle.*
import org.mopcon.session.app.network.model.agenda.AgendaData
import org.mopcon.session.app.repository.AgendaRepository
import org.mopcon.session.app.ui.base.BaseViewModel
import org.mopcon.session.app.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.coroutineScope
import kotlinx.coroutines.launch
import timber.log.Timber

class AgendaViewModel(repository: AgendaRepository) : BaseViewModel(repository) {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _agendaList = MutableLiveData<Pair<List<AgendaData>, List<Int>>>()
    val agendaList: LiveData<Pair<List<AgendaData>, List<Int>>> = _agendaList

    private val _exchangeList = MutableLiveData<List<AgendaData>>()
    val exchangeList: LiveData<List<AgendaData>> = _exchangeList

    fun getAgenda() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            val favSessionList = getFavSessionIdList()
            request(
                request = {
                    repository.getAgenda()
                },
                onSuccess = {
                    _isLoading.postValue(false)
                    _agendaList.value = Pair((it.body()?.data ?: listOf()), favSessionList)
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
                    _exchangeList.value = it.body()?.data ?: listOf()
                },
                onError = {
                    Timber.e("onError, $it")
                    _isLoading.postValue(false)
                }
            )
        }
    }

}
