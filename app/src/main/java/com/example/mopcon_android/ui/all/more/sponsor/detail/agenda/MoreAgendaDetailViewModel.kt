package com.example.mopcon_android.ui.all.more.sponsor.detail.agenda

import androidx.lifecycle.*
import com.example.mopcon_android.db.AgendaFavData
import com.example.mopcon_android.db.DataConverter
import com.example.mopcon_android.network.model.agenda.AgendaData
import com.example.mopcon_android.network.model.agenda.RoomData
import com.example.mopcon_android.network.model.agenda_detail.AgendaDetailData
import com.example.mopcon_android.network.model.more.sponsor.SponsorData
import com.example.mopcon_android.network.service.ApiService
import com.example.mopcon_android.repository.AgendaRepository
import com.example.mopcon_android.util.HM_FORMAT
import com.example.mopcon_android.util.request
import com.example.mopcon_android.util.toTimeFormat
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import timber.log.Timber

class MoreAgendaDetailViewModel(private val apiService: ApiService, private val repository: AgendaRepository) : ViewModel() {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _agendaDetail = MutableLiveData<AgendaDetailData>()
    val agendaDetail: LiveData<AgendaDetailData> = _agendaDetail

    private val _favSessionIdList = MutableLiveData<List<Int>>()
    val favSessionIdList: LiveData<List<Int>> = _favSessionIdList

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

    fun storeAgenda() {
        viewModelScope.launch(Dispatchers.IO) {
            val data = agendaDetail.value ?: return@launch
            val startTime = if (data.startedAt?.toString().isNullOrEmpty()) "" else "${data.startedAt?.toTimeFormat(HM_FORMAT)}"
            val endTimeStr = if (data.endedAt?.toString().isNullOrEmpty()) "" else " - ${data.endedAt?.toTimeFormat(HM_FORMAT)}"
            repository.storeAgenda(
                AgendaFavData(
                    sessionId = data.sessionId,
                    time = "$startTime$endTimeStr",
                    topic = data.topic ?: "",
                    topicE = data.topicE ?: "",
                    names = (data.speakers ?: listOf()).joinToString("｜") { speaker -> if (speaker.nameE.isNullOrEmpty()) speaker.name ?: "" else speaker.nameE },
                    namesE = (data.speakers ?: listOf()).joinToString("｜") { speaker -> speaker.name ?: "" },
                    location = data.room ?: "",
                    tags = DataConverter.fromTagList(data.tags)
                )
            )
        }
    }

    fun deleteAgenda(sessionId: Int?) {
        sessionId ?: return
        viewModelScope.launch(Dispatchers.IO) {
            repository.deleteAgenda(sessionId)
        }
    }

    fun getFavSessionIdList() {
        viewModelScope.launch(Dispatchers.IO) {
            _favSessionIdList.postValue(repository.getFavSessionIdList())
        }
    }

}
