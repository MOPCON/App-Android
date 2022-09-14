package org.mopcon.android.ui.all.more.host_community

import androidx.lifecycle.*
import org.mopcon.android.network.model.community.Community
import org.mopcon.android.network.model.community_detail.CommunityDetailData
import org.mopcon.android.network.model.volunteer.VolunteerData
import org.mopcon.android.network.model.volunteer_detail.VolunteerDetailData
import org.mopcon.android.network.service.ApiService
import org.mopcon.android.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class HostCommunityViewModel(private val apiService: ApiService) : ViewModel() {

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _community = MutableLiveData<Community>()
    val community: LiveData<Community> = _community

    private val _communityDetail = MutableLiveData<CommunityDetailData>()
    val communityDetail: LiveData<CommunityDetailData> = _communityDetail

    private val _volunteer = MutableLiveData<List<VolunteerData>>()
    val volunteer: LiveData<List<VolunteerData>> = _volunteer

    private val _volunteerDetail = MutableLiveData<VolunteerDetailData>()
    val volunteerDetail: LiveData<VolunteerDetailData> = _volunteerDetail

    fun getCommunity() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getCommunity() },
                onSuccess = {
                    _isLoading.postValue(false)
                    _community.postValue(it.body()?.data)
                },
                onError = {
                    _isLoading.postValue(false)
                }
            )
        }
    }

    fun getCommunityDetail(id: Int?) {
        if (id == null) return
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getCommunityDetail(id) },
                onSuccess = {
                    _isLoading.postValue(false)
                    _communityDetail.postValue(it.body()?.data)
                },
                onError = {
                    _isLoading.postValue(false)
                }
            )
        }
    }

    fun getVolunteer() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getVolunteer() },
                onSuccess = {
                    _isLoading.postValue(false)
                    _volunteer.postValue(it.body()?.data?.volunteer ?: listOf())
                },
                onError = {
                    _isLoading.postValue(false)
                }
            )
        }
    }

    fun getVolunteerDetail(id: Int?) {
        if (id == null) return
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getVolunteerDetail(id) },
                onSuccess = {
                    _isLoading.postValue(false)
                    _volunteerDetail.postValue(it.body()?.data)
                },
                onError = {
                    _isLoading.postValue(false)
                }
            )
        }
    }

}
