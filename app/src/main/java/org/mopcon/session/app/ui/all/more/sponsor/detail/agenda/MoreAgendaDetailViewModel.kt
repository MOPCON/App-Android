package org.mopcon.session.app.ui.all.more.sponsor.detail.agenda

import androidx.lifecycle.*
import org.mopcon.session.app.network.model.agenda.RoomData
import org.mopcon.session.app.network.service.ApiService
import org.mopcon.session.app.repository.AgendaRepository
import org.mopcon.session.app.ui.base.BaseViewModel
import org.mopcon.session.app.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import timber.log.Timber

class MoreAgendaDetailViewModel(private val apiService: ApiService, repository: AgendaRepository) : BaseViewModel(repository) {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _agendaDetail = MutableLiveData<RoomData>()
    val agendaDetail: LiveData<RoomData> = _agendaDetail

    private val _exchangeDetail = MutableLiveData<RoomData>()
    val exchangeDetail: LiveData<RoomData> = _exchangeDetail

    fun getAgendaDetail(sessionId: Int?) {
        sessionId ?: return
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = {
                    apiService.getAgendaDetail(sessionId)
                },
                onSuccess = {
                    _isLoading.postValue(false)
                    _agendaDetail.value = it.body()?.data
                },
                onError = {
                    Timber.e("onError, $it")
                    _isLoading.postValue(false)
                }
            )
        }
    }

    fun getExchangeDetail(sessionId: Int?) {
        sessionId ?: return
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getExchangeDetail(sessionId) },
                onSuccess = {
                    _isLoading.postValue(false)
                    _exchangeDetail.value = it.body()?.data?.firstOrNull()
                },
                onError = {
                    Timber.e("onError, $it")
                    _isLoading.postValue(false)
                }
            )
        }
    }

}
