package org.mopcon.session.app.ui.all.more.sponsor

import androidx.lifecycle.*
import org.mopcon.session.app.network.model.more.sponsor.SponsorData
import org.mopcon.session.app.network.service.ApiService
import org.mopcon.session.app.repository.AgendaRepository
import org.mopcon.session.app.ui.base.BaseViewModel
import org.mopcon.session.app.util.request
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
