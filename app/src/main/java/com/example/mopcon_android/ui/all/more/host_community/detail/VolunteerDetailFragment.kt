package com.example.mopcon_android.ui.all.more.host_community.detail

import android.os.Bundle
import android.view.LayoutInflater
import android.view.ViewGroup
import com.example.mopcon_android.databinding.FragmentHostCommunityBinding
import com.example.mopcon_android.databinding.FragmentHostCommunityDetailBinding
import com.example.mopcon_android.databinding.FragmentMoreBinding
import com.example.mopcon_android.databinding.FragmentVolunteerDetailBinding
import com.example.mopcon_android.network.community.CommunityData
import com.example.mopcon_android.network.model.volunteer.VolunteerData
import com.example.mopcon_android.ui.all.more.host_community.HostCommunityViewModel
import com.example.mopcon_android.ui.base.BaseBindingFragment
import com.example.mopcon_android.util.getDeviceLanguage
import com.example.mopcon_android.util.setGlideImg
import org.koin.androidx.viewmodel.ext.android.viewModel

class VolunteerDetailFragment : BaseBindingFragment<FragmentVolunteerDetailBinding>() {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentVolunteerDetailBinding
        get() = FragmentVolunteerDetailBinding::inflate

    private val args by lazy { arguments?.getParcelable(BUNDLE_VOLUNTEER_DATA) as VolunteerData? }

    private val viewModel: HostCommunityViewModel by viewModel()

    companion object {
        private const val BUNDLE_VOLUNTEER_DATA = "bundle_volunteer_data"
        fun newInstance(volunteerData: VolunteerData) = VolunteerDetailFragment().apply {
            val bundle = Bundle().apply {
                putParcelable(BUNDLE_VOLUNTEER_DATA, volunteerData)
            }
            arguments = bundle
        }
    }

    override fun initLayout() {
        binding.titleBar.backPressedListener = { activity?.onBackPressed() }

        binding.apply {
            layoutSpeaker.apply {
                ivAvatar.setGlideImg(args?.photo)
            }

            tvVolunteer.text = getDeviceLanguage(
                isEnglish = { if (args?.nameE.isNullOrEmpty()) args?.name ?: "" else args?.nameE ?: "" },
                isOtherLanguage = { args?.name ?: "" }
            )

        }
    }

    override fun initAction() {
        viewModel.getVolunteerDetail(args?.id)
    }

    override fun initObserver() {
        viewModel.volunteerDetail.observe(viewLifecycleOwner) {
            binding.apply {
                tvContent.text = getDeviceLanguage(
                    isEnglish = { if (it?.introductionE.isNullOrEmpty()) it?.introduction ?: "" else it?.introductionE ?: "" },
                    isOtherLanguage = { it?.introduction ?: "" }
                )
                tvMember.text = getDeviceLanguage(
                    isEnglish = { it?.members?.joinToString(", ") ?: "" },
                    isOtherLanguage = { it?.members?.joinToString("、") ?: "" }
                )
            }
        }

        viewModel.isLoading.observe(viewLifecycleOwner) {
            if (it) loading() else hideLoading()
        }
    }
}