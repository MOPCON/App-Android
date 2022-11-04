package org.mopcon.session.app.ui.all.home

import androidx.lifecycle.*
import org.mopcon.session.app.network.model.home.HomeBannerNewsData
import org.mopcon.session.app.network.service.ApiService
import org.mopcon.session.app.repository.AgendaRepository
import org.mopcon.session.app.ui.base.BaseViewModel
import org.mopcon.session.app.util.combineWith
import org.mopcon.session.app.util.request
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


class HomeViewModel(private val apiService: ApiService, repository: AgendaRepository) : BaseViewModel(repository) {
    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> = _isLoading

    private val _bannerAndNews = MutableLiveData<HomeBannerNewsData>()
    private val bannerAndNews: LiveData<HomeBannerNewsData> = _bannerAndNews

    val combiner = bannerAndNews.combineWith(favAgendaList) { bannerNews, agendaFav ->
        _isLoading.postValue(false)
        Pair(bannerNews, agendaFav)
    }

    fun getHomeBannerAndNews() {
        viewModelScope.launch(Dispatchers.IO) {
            _isLoading.postValue(true)
            request(
                request = { apiService.getHomeBannerAndNews() },
                onSuccess = {
                    _isLoading.postValue(false)
                    _bannerAndNews.value = it.body()?.data
                },
                onError = {
                    _isLoading.postValue(false)
                }
            )
        }
    }

}
