package com.example.mopcon_android.ui.all.more.sponsor.detail.agenda

import androidx.lifecycle.*
import com.example.mopcon_android.network.model.agenda.AgendaData
import com.example.mopcon_android.network.model.agenda_detail.AgendaDetailData
import com.example.mopcon_android.network.model.more.sponsor.SponsorData
import com.example.mopcon_android.network.service.ApiService
import com.example.mopcon_android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import timber.log.Timber

class MoreAgendaDetailViewModel(private val apiService: ApiService) : ViewModel() {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _agendaDetail = MutableLiveData<AgendaDetailData>()
    val agendaDetail: LiveData<AgendaDetailData> = _agendaDetail

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
