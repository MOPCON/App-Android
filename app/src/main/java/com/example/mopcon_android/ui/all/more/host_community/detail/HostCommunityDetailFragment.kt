package com.example.mopcon_android.ui.all.more.host_community.detail

import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentHostCommunityDetailBinding
import com.example.mopcon_android.network.model.community.CommunityData
import com.example.mopcon_android.ui.all.more.host_community.HostCommunityViewModel
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.util.getDeviceLanguage
import com.example.mopcon_android.util.setGlideImg
import org.koin.androidx.viewmodel.ext.android.viewModel

class HostCommunityDetailFragment : BaseBindingFragment<FragmentHostCommunityDetailBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentHostCommunityDetailBinding
        get() = FragmentHostCommunityDetailBinding::inflate

    private val args by lazy { arguments?.getParcelable(BUNDLE_COMMUNITY_DATA) as CommunityData? }

    private val viewModel: HostCommunityViewModel by viewModel()

    companion object {
        private const val BUNDLE_COMMUNITY_DATA = "bundle_community_data"
        fun newInstance(roomData: CommunityData) = HostCommunityDetailFragment().apply {
            val bundle = Bundle().apply {
                putParcelable(BUNDLE_COMMUNITY_DATA, roomData)
            }
            arguments = bundle
        }
    }

    override fun initLayout() {
        binding.titleBar.backPressedListener = { activity?.onBackPressed() }

        binding.layoutSponsor.apply {
            tvSponsor.text = getDeviceLanguage(
                isEnglish = { if (args?.nameE.isNullOrEmpty()) args?.name ?: "" else args?.nameE ?: "" },
                isOtherLanguage = { args?.name ?: "" }
            )

            ivSponsor.setGlideImg(args?.photo)
        }

    }

    override fun initAction() {
        viewModel.getCommunityDetail(args?.id)
    }

    override fun initObserver() {
        viewModel.communityDetail.observe(viewLifecycleOwner) {
            binding.apply {

                mediaBar.apply {
                    setOnClickOpenWeb(
                        null,
                        it.facebook,
                        it.instagram,
                        null,
                        null,
                        it.twitter
                    )
                    setItemVisibility(
                        showWeb = false,
                        it.facebook?.isNotEmpty() == true,
                        showIg = it.instagram?.isNotEmpty() == true,
                        showLinkedIn = false,
                        showGit = false,
                        showTwitter = it.twitter?.isNotEmpty() == true
                    )
                }
                tvContent.text = getDeviceLanguage(
                    isEnglish = { if (it?.introductionE.isNullOrEmpty()) it?.introduction ?: "" else it?.introductionE ?: "" },
                    isOtherLanguage = { it?.introduction ?: "" }
                )
            }
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }


}