package org.mopcon.android.ui.all.more.host_community.detail

import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import org.mopcon.android.databinding.FragmentHostCommunityDetailBinding
import org.mopcon.android.network.model.community.CommunityData
import org.mopcon.android.ui.all.more.host_community.HostCommunityViewModel
import org.mopcon.android.ui.base.BaseBindingFragment
import org.mopcon.android.util.getDeviceLanguage
import org.koin.androidx.viewmodel.ext.android.viewModel
import org.mopcon.android.util.setGlideImg

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

            ivSponsor.setGlideImg(args?.photo?.mobile)
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