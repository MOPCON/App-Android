package com.example.mopcon_android.ui.base

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.mopcon_android.db.AgendaFavData
import com.example.mopcon_android.db.DataConverter
import com.example.mopcon_android.network.model.agenda.RoomData
import com.example.mopcon_android.repository.AgendaRepository
import com.example.mopcon_android.util.HM_FORMAT
import com.example.mopcon_android.util.toTimeFormat
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


abstract class BaseViewModel(
    val repository: AgendaRepository
) : ViewModel() {

    private val _favSessionIdList = MutableLiveData<List<Int>>()
    val favSessionIdList: LiveData<List<Int>> = _favSessionIdList

    fun storeAgenda(data: RoomData) {
        viewModelScope.launch(Dispatchers.IO) {
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