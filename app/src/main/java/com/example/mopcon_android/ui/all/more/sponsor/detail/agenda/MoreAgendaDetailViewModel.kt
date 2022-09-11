package com.example.mopcon_android.ui.all.more.sponsor.detail.agenda

import androidx.lifecycle.*
import com.example.mopcon_android.network.model.agenda.RoomData
import com.example.mopcon_android.network.service.ApiService
import com.example.mopcon_android.repository.AgendaRepository
import com.example.mopcon_android.ui.base.BaseViewModel
import com.example.mopcon_android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import timber.log.Timber

class MoreAgendaDetailViewModel(private val apiService: ApiService, repository: AgendaRepository) : BaseViewModel(repository) {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _agendaDetail = MutableLiveData<RoomData>()
    val agendaDetail: LiveData<RoomData> = _agendaDetail

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
}
