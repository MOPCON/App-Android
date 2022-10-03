package org.mopcon.session.app.ui.base

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import org.mopcon.session.app.db.AgendaFavData
import org.mopcon.session.app.db.DataConverter
import org.mopcon.session.app.network.model.agenda.RoomData
import org.mopcon.session.app.repository.AgendaRepository
import org.mopcon.session.app.util.HM_FORMAT
import org.mopcon.session.app.util.toTimeFormat
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


abstract class BaseViewModel(
    val repository: AgendaRepository
) : ViewModel() {

    private val _favSessionIdList = MutableLiveData<List<Int>>()
    val favSessionIdList: LiveData<List<Int>> = _favSessionIdList

    private val _favAgendaList = MutableLiveData<List<AgendaFavData>>()
    val favAgendaList: LiveData<List<AgendaFavData>> = _favAgendaList

    fun storeAgenda(data: RoomData) {
        viewModelScope.launch(Dispatchers.IO) {
            val startTime = if (data.startedAt?.toString().isNullOrEmpty()) "" else "${data.startedAt?.toTimeFormat(HM_FORMAT)}"
            val endTimeStr = if (data.endedAt?.toString().isNullOrEmpty()) "" else " - ${data.endedAt?.toTimeFormat(HM_FORMAT)}"
            repository.storeAgenda(
                AgendaFavData(
                    sessionId = data.sessionId,
                    startAt = data.startedAt ?: 0,
                    time = "$startTime$endTimeStr",
                    topic = data.topic ?: "",
                    topicE = data.topicE ?: "",
                    names = (data.speakers ?: listOf()).joinToString("｜") { speaker -> if (speaker.nameE.isNullOrEmpty()) speaker.name ?: "" else speaker.nameE },
                    namesE = (data.speakers ?: listOf()).joinToString("｜") { speaker -> speaker.nameE ?: speaker.name ?: ""},
                    location = data.room ?: "",
                    tags = DataConverter.fromTagList(data.tags)
                )
            )
        }
    }

    fun storeAgenda(data: AgendaFavData) {
        viewModelScope.launch(Dispatchers.IO) {
            repository.storeAgenda(data)
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

    fun getStoredAgenda() {
        viewModelScope.launch(Dispatchers.IO) {
            _favAgendaList.postValue(repository.getStoredAgenda())
        }
    }

}