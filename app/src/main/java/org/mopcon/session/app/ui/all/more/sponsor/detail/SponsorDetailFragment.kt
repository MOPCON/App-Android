package org.mopcon.session.app.ui.all.more.sponsor.detail

import android.os.Bundle
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.activity.OnBackPressedCallback
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import org.mopcon.session.app.R
import org.mopcon.session.app.databinding.*
import org.mopcon.session.app.db.AgendaFavData
import org.mopcon.session.app.db.DataConverter
import org.mopcon.session.app.network.model.more.sponsor.SponsorDetailData
import org.mopcon.session.app.ui.all.more.sponsor.SponsorViewModel
import org.mopcon.session.app.ui.all.more.sponsor.detail.agenda.MoreAgendaDetailFragment
import org.mopcon.session.app.ui.base.BaseBindingFragment
import org.mopcon.session.app.util.HM_FORMAT
import org.mopcon.session.app.util.addFragmentToFragment
import org.mopcon.session.app.util.toTimeFormat
import org.koin.androidx.viewmodel.ext.android.viewModel
import org.mopcon.session.app.ui.extension.OnBackPressedListener

class SponsorDetailFragment : BaseBindingFragment<FragmentSponsorDetailBinding>(), OnBackPressedListener {

    override val bindingInflater: (LayoutInflater, ViewGroup?, Boolean) -> FragmentSponsorDetailBinding
        get() = FragmentSponsorDetailBinding::inflate

    private val viewModel: SponsorViewModel by viewModel()

    private val args by lazy { arguments?.getParcelable(BUNDLE_SPONSOR_DATA) as SponsorDetailData? }

    private val sponsorDetailAdapter by lazy {
        SponsorDetailAdapter(SponsorDetailItemClickListener {
            if (it.sessionId == null) return@SponsorDetailItemClickListener
            parentFragmentManager.addFragmentToFragment(R.id.llMore, MoreAgendaDetailFragment.newInstance(it.sessionId))
        }, FavClickListener { isChecked, data ->
            if (isChecked) {
                val startTime = if (data.startedAt?.toString().isNullOrEmpty()) "" else "${data.startedAt?.toTimeFormat(HM_FORMAT)}"
                val endTimeStr = if (data.endedAt?.toString().isNullOrEmpty()) "" else " - ${data.endedAt?.toTimeFormat(HM_FORMAT)}"
                viewModel.storeAgenda(
                    AgendaFavData(
                        sessionId = data.sessionId,
                        startAt = data.startedAt ?: 0,
                        time = "$startTime$endTimeStr",
                        topic = data.topicName,
                        topicE = data.topicNameE ?: data.topicName,
                        names = data.name ?: "",
                        namesE = data.nameE ?: data.name ?: "",
                        location = data.room ?: "",
                        tags = DataConverter.fromTagList(data.tags)
                    )
                )
            } else {
                viewModel.deleteAgenda(data.sessionId)
            }
        })
    }

    companion object {
        private const val BUNDLE_SPONSOR_DATA = "bundle_sponsor_data"
        fun newInstance(sponsorDetailData: SponsorDetailData) = SponsorDetailFragment().apply {
            val bundle = Bundle().apply {
                putParcelable(BUNDLE_SPONSOR_DATA, sponsorDetailData)
            }
            arguments = bundle
        }
    }

    private val mBackPressedCallback: OnBackPressedCallback by lazy {
        object : OnBackPressedCallback(true) {
            override fun handleOnBackPressed() {
                viewModel.updateFavSessionIdList()
                isEnabled = false
                requireActivity().onBackPressed()
                isEnabled = true
            }
        }
    }

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return super.onCreateView(inflater, container, savedInstanceState).apply {
            requireActivity().onBackPressedDispatcher.addCallback(viewLifecycleOwner, mBackPressedCallback)
        }
    }

    override fun initLayout() {
        binding.rvSponsorDetail.apply {
            adapter = sponsorDetailAdapter
            layoutManager = LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false)
            setHasFixedSize(true)
            itemAnimator = null
        }
    }

    override fun initAction() {
        viewModel.updateFavSessionIdList()
    }

    override fun initObserver() {
        viewModel.favSessionIdList.observe(viewLifecycleOwner) {
            sponsorDetailAdapter.addFooterAndSubmitList(it, args)
        }
    }

    override fun onBackPressed() {
//        viewModel.updateFavSessionIdList()
    }

}