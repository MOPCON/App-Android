package com.example.mopcon_android.ui.all.home

import android.content.Intent
import android.net.Uri
import android.util.Log
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.mopcon_android.R
import com.example.mopcon_android.databinding.FragmentHomeBinding
import com.example.mopcon_android.db.AgendaFavData
import com.example.mopcon_android.ui.all.MainActivity
import com.example.mopcon_android.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.util.addFragmentToFragment
import org.koin.androidx.viewmodel.ext.android.viewModel


class HomeFragment : BaseBindingFragment<FragmentHomeBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentHomeBinding = FragmentHomeBinding::inflate

    private val viewModel: HomeViewModel by viewModel()

    private var favList = listOf<AgendaFavData>()

    private val homeAdapter by lazy {
        HomeAdapter(
            BannerClickListener {
                context?.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(it)))
            }, NewsMoreClickListener {
                (activity as MainActivity).setTabToNews()
            }, NewsItemClickListener {
                context?.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(it)))
            }, FavClickListener {
                parentFragmentManager.addFragmentToFragment(R.id.llHome, MoreAgendaDetailFragment.newInstance(it))
            }, NoFavClickListener {
                (activity as MainActivity).setTabToAgenda()
            })
    }

    override fun initLayout() {
        binding.rvHome.apply {
            adapter = homeAdapter
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
//            addItemDecoration(BottomItemDecoration(20))
        }
    }

    override fun initAction() {
//        viewModel.getHomeBannerAndNews()
        viewModel.getStoredAgenda()
    }

    override fun initObserver() {
        viewModel.bannerAndNews.observe(viewLifecycleOwner) {
            homeAdapter.addFooterAndSubmitList(it.banner, it.news, favList) { binding.rvHome.scrollToPosition(0) } //TODO: add fav list
        }

        viewModel.favAgendaList.observe(viewLifecycleOwner) {
            favList = it
            viewModel.getHomeBannerAndNews()
        }

        viewModel.mediatorLiveData.observe(viewLifecycleOwner) {
            val bannerAndNews = it.first
            val favAgendaList = it.second
            Log.e(">>>", "$bannerAndNews,,,,,,$favAgendaList")

            homeAdapter.addFooterAndSubmitList(bannerAndNews.banner, bannerAndNews.news, favAgendaList) { binding.rvHome.scrollToPosition(0) } //TODO: add fav list
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }

}