package com.example.mopcon_android.ui.all.more.sponsor

import androidx.lifecycle.*
import com.example.mopcon_android.network.model.more.sponsor.SponsorData
import com.example.mopcon_android.network.service.ApiService
import com.example.mopcon_android.repository.AgendaRepository
import com.example.mopcon_android.ui.base.BaseViewModel
import com.example.mopcon_android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class SponsorViewModel(private val apiService: ApiService, repository: AgendaRepository) : BaseViewModel(repository) {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _sponsors = MutableLiveData<List<SponsorData>>()
    val sponsors: LiveData<List<SponsorData>> = _sponsors

    fun getSponsors() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getSponsor() },
                onSuccess = {
                    _isLoading.postValue(false)
                    _sponsors.postValue(it.body()?.data ?: listOf())
                },
                onError = {
                    _isLoading.postValue(false)
                }
            )
        }
    }

    fun getSponsorDetail(sponsorId: Int?) {
        if (sponsorId == null) return
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getSponsorDetail(sponsorId) },
                onSuccess = {
                    _isLoading.postValue(false)
//                    _sponsors.postValue(it.body() ?: listOf())
                },
                onError = {
                    _isLoading.postValue(false)
                }
            )
        }
    }

}
