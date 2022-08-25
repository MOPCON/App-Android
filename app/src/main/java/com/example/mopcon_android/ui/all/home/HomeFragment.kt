package com.example.mopcon_android.ui.all.home

import android.content.Intent
import android.net.Uri
import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.LinearLayoutManager
import com.example.mopcon_android.databinding.FragmentHomeBinding
import com.example.mopcon_android.ui.all.MainActivity
import com.example.mopcon_android.ui.base.BaseBindingFragment
import org.koin.androidx.viewmodel.ext.android.viewModel


class HomeFragment : BaseBindingFragment<FragmentHomeBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentHomeBinding = FragmentHomeBinding::inflate

    private val viewModel: HomeViewModel by viewModel()
    private val homeAdapter by lazy {
        HomeAdapter(
            BannerClickListener {
                context?.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(it)))
            }, NewsMoreClickListener {
                (activity as MainActivity).setTabToNews()
            }, NewsItemClickListener {
                context?.startActivity(Intent(Intent.ACTION_VIEW, Uri.parse(it)))
            }, NoFavClickListener {
                (activity as MainActivity).setTabToAgenda()
            })
    }

    override fun initLayout() {
        binding.rvHome.adapter = homeAdapter
        binding.rvHome.layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
    }

    override fun initAction() {
        viewModel.getHomeBannerAndNews()
    }

    override fun initObserver() {
        viewModel.bannerAndNews.observe(viewLifecycleOwner) {
            homeAdapter.addFooterAndSubmitList(it.banner, it.news, listOf()) { binding.rvHome.scrollToPosition(0) } //TODO: add fav list
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }

}