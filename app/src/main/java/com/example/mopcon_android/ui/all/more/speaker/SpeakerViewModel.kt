package com.example.mopcon_android.ui.all.more.speaker

import androidx.lifecycle.*
import com.example.mopcon_android.db.AgendaFavData
import com.example.mopcon_android.db.DataConverter
import com.example.mopcon_android.network.model.agenda.RoomData
import com.example.mopcon_android.network.model.more.speaker.SpeakerData
import com.example.mopcon_android.network.service.ApiService
import com.example.mopcon_android.repository.AgendaRepository
import com.example.mopcon_android.ui.base.BaseViewModel
import com.example.mopcon_android.util.HM_FORMAT
import com.example.mopcon_android.util.request
import com.example.mopcon_android.util.toTimeFormat
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class SpeakerViewModel(private val apiService: ApiService, repository: AgendaRepository) : BaseViewModel(repository) {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _speakers = MutableLiveData<List<SpeakerData>>()
    val speakers: LiveData<List<SpeakerData>> = _speakers

    fun getSpeakers() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getSpeaker() },
                onSuccess = {
                    _isLoading.postValue(false)
                    _speakers.postValue(it.body()?.data ?: listOf())
                },
                onError = {
                    _isLoading.postValue(false)
                }
            )
        }
    }
}
