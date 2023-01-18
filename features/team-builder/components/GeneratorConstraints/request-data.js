export function generatorRequestData(qs, generatorConstraints) {
    return {
        filters: qs || "",
        cons_max_cost: generatorConstraints.cons_max_cost || "26000000",
        cons_max_ovr: generatorConstraints.cons_max_ovr || "99",
        cons_min_lsw: generatorConstraints.cons_min_lsw || "0",
        cons_min_lsp: generatorConstraints.cons_min_lsp || "0",
        cons_min_lrp: generatorConstraints.cons_min_lrp || "0",
        objective_hit:
          generatorConstraints.objective_hit ||
          "playerprofileadvanced__overall_true",
        objective_sp:
          generatorConstraints.objective_sp ||
          "playerprofileadvanced__overall_true",
        objective_rp:
          generatorConstraints.objective_rp ||
          "playerprofileadvanced__overall_true",
        tourney_style: false,
        cons_num_diam_high: "0",
        cons_num_diam_low: 0,
        cons_num_gold: 0,
        cons_num_silv: 0,
        cons_num_bron_high: 0,
        cons_num_bron_low: 0,
        cons_num_comm_high: 0,
        cons_num_comm_low: 0,
        user_id: generatorConstraints.user_id || null
    }
}