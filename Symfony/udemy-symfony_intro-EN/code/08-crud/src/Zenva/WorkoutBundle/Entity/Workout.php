<?php

namespace Zenva\WorkoutBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Workout
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Zenva\WorkoutBundle\Entity\WorkoutRepository")
 */
class Workout
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="occurrenceDate", type="date")
     */
    private $occurrenceDate;

    /**
     * @var string
     *
     * @ORM\Column(name="activity", type="string", length=255)
     */
    private $activity;
    
    /**
     * @ORM\Column(name="hours", type="float")
     */
    private $hours = 1;
    

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set occurrenceDate
     *
     * @param \DateTime $occurrenceDate
     * @return Workout
     */
    public function setOccurrenceDate($occurrenceDate)
    {
        $this->occurrenceDate = $occurrenceDate;
    
        return $this;
    }

    /**
     * Get occurrenceDate
     *
     * @return \DateTime 
     */
    public function getOccurrenceDate()
    {
        return $this->occurrenceDate;
    }

    /**
     * Set activity
     *
     * @param string $activity
     * @return Workout
     */
    public function setActivity($activity)
    {
        $this->activity = $activity;
    
        return $this;
    }

    /**
     * Get activity
     *
     * @return string 
     */
    public function getActivity()
    {
        return $this->activity;
    }
    
    
    public function getHours()
    {
        return $this->hours;
    }
    
    public function setHours($hours)
    {
        $this->hours = $hours;
    }
}
