package com.example.mopcon_android.ui.all.agenda

import androidx.lifecycle.*
import com.example.mopcon_android.db.AgendaFavData
import com.example.mopcon_android.db.DataConverter.fromStringList
import com.example.mopcon_android.db.DataConverter.fromTagList
import com.example.mopcon_android.network.model.agenda.AgendaData
import com.example.mopcon_android.network.model.agenda.RoomData
import com.example.mopcon_android.repository.AgendaRepository
import com.example.mopcon_android.util.HM_FORMAT
import com.example.mopcon_android.util.request
import com.example.mopcon_android.util.toTimeFormat
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import timber.log.Timber

class AgendaViewModel(private val repository: AgendaRepository) : ViewModel() {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _agendaList = MutableLiveData<Pair<Boolean, List<AgendaData>>>()
    val agendaList: LiveData<Pair<Boolean, List<AgendaData>>> = _agendaList

    private val _favSessionIdList = MutableLiveData<List<Int>>()
    val favSessionIdList: LiveData<List<Int>> = _favSessionIdList

    fun getAgenda(isIconBlue: Boolean) {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)

            request(
                request = {
                    repository.getAgenda()
                },
                onSuccess = {
                    _isLoading.postValue(false)
                    _agendaList.value = Pair(isIconBlue, it.body()?.data ?: listOf())
                },
                onError = {
                    Timber.e("onError, $it")
                    _isLoading.postValue(false)
                }
            )
        }
    }

    fun getExchange(isIconBlue: Boolean) {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { repository.getExchange() },
                onSuccess = {
                    _isLoading.postValue(false)
                    _agendaList.value = Pair(isIconBlue, it.body()?.data ?: listOf())
                },
                onError = {
                    Timber.e("onError, $it")
                    _isLoading.postValue(false)
                }
            )
        }
    }

    fun storeAgenda(isIconBlue: Boolean, data: RoomData) {
        viewModelScope.launch(Dispatchers.IO) {
            val startTime = if (data.startedAt?.toString().isNullOrEmpty()) "" else "${data.startedAt?.toTimeFormat(HM_FORMAT)}"
            val endTimeStr = if (data.endedAt?.toString().isNullOrEmpty()) "" else " - ${data.endedAt?.toTimeFormat(HM_FORMAT)}"
            repository.storeAgenda(
                AgendaFavData(
                    sessionId = data.sessionId,
                    isBlue = isIconBlue,
                    time = "$startTime$endTimeStr",
                    topic = data.topic ?: "",
                    topicE = data.topicE ?: "",
                    names = (data.speakers ?: listOf()).joinToString("｜") { speaker -> if (speaker.nameE.isNullOrEmpty()) speaker.name ?: "" else speaker.nameE },
                    namesE = (data.speakers ?: listOf()).joinToString("｜") { speaker -> speaker.name ?: "" },
                    location = data.room ?: "",
                    tags = fromTagList(data.tags)
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
