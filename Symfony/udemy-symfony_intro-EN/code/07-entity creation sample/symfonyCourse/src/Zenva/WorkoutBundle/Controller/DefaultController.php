<?php

namespace Zenva\WorkoutBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Zenva\WorkoutBundle\Entity\Workout;

/**
 * @Route("workout")
 */
class DefaultController extends Controller
{
    /**
     * @Route("/", name="workout_index")
     * @Template("")
     */
    public function indexAction()
    {
        $workout = new Workout();
        $workout->setActivity('yoga');
        $workout->setHours(1);
        $workout->setOccurrenceDate(new \DateTime());
        
        $em = $this->getDoctrine()->getEntityManager();
        $em->persist($workout);
        $em->flush();        
        
        return array();
    }
}
